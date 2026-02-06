import React, { useState, useEffect } from "react";

/**
 * ==========================================
 * CONTOH PRAKTIS PENGGUNAAN HOOK
 * Dokumentasi dengan Code Samples
 * ==========================================
 */

// ═══════════════════════════════════════════════════════════════
// CONTOH 1: useState Hook untuk State Management
// ═══════════════════════════════════════════════════════════════

function ContohUseState() {
  // Hook 1: Simple State
  const [count, setCount] = useState(0);

  // Hook 2: String State
  const [name, setName] = useState("AutoZone");

  // Hook 3: Boolean State
  const [isLoading, setIsLoading] = useState(false);

  // Hook 4: Array State
  const [cars, setCars] = useState([]);

  // Hook 5: Object State (tidak recommended - gunakan multiple useState)
  const [user, setUser] = useState({ name: "", age: 0 });

  // Update menggunakan setter
  const incrementCount = () => {
    setCount(count + 1); // Direct update
  };

  const incrementCountFunctional = () => {
    setCount((prev) => prev + 1); // Functional update (BETTER)
  };

  const addCar = (car) => {
    // Spread operator untuk array immutability
    setCars([...cars, car]);
  };

  return (
    <div>
      <h2>useState Examples</h2>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>

      <p>Name: {name}</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <p>Loading: {isLoading ? "Yes" : "No"}</p>
      <button onClick={() => setIsLoading(!isLoading)}>Toggle Loading</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTOH 2: useEffect Hook untuk Side Effects
// ═══════════════════════════════════════════════════════════════

function ContohUseEffect() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState(1);

  // Effect 1: Run sekali saat component mount
  useEffect(() => {
    console.log("Component mounted!");

    // Optional: Cleanup function
    return () => {
      console.log("Component will unmount!");
    };
  }, []); // Empty dependency = run once on mount

  // Effect 2: Run setiap kali id berubah
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/cars/${id}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]); // Dependency = [id] = run when id changes

  // Effect 3: Run setiap render (HINDARI!)
  // useEffect(() => {
  //   console.log("This runs every render! AVOID!");
  // }); // No dependency array = INFINITE LOOP!

  return (
    <div>
      <h2>useEffect Examples</h2>
      <input type="number" value={id} onChange={(e) => setId(e.target.value)} />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <p>Data: {JSON.stringify(data)}</p>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTOH 3: Kombinasi useState + useEffect (Real Case)
// ═══════════════════════════════════════════════════════════════

function CatalogCars({ membership }) {
  // State definitions
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Tesla");
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  // Effect 1: Load brands on mount
  useEffect(() => {
    const loadBrands = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/cars/brands");
        const data = await response.json();
        setBrands(data);

        // Set default brand if available
        if (data.length > 0) {
          setSelectedBrand(data[0].name);
        }
      } catch (error) {
        setHasError("Failed to load brands");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBrands();
  }, []); // Run once on mount

  // Effect 2: Fetch cars when brand changes
  useEffect(() => {
    const fetchCars = async () => {
      if (!selectedBrand) return;

      try {
        setIsLoading(true);
        setHasError(null);

        const response = await fetch(`/api/cars?brand=${encodeURIComponent(selectedBrand)}`);
        const data = await response.json();

        setCars(data);
      } catch (error) {
        setHasError(`Failed to load cars for ${selectedBrand}`);
        setCars([]);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [selectedBrand]); // Run when selectedBrand changes

  // Filter cars based on search query
  const filteredCars = cars.filter((car) => car.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Car Catalog</h1>

      {/* Search Input */}
      <input type="text" placeholder="Search cars..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ marginRight: "10px", padding: "5px" }} />

      {/* Brand Selector */}
      <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} style={{ padding: "5px" }}>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.name}>
            {brand.name}
          </option>
        ))}
      </select>

      {/* Loading State */}
      {isLoading && <p>Loading...</p>}

      {/* Error State */}
      {hasError && <p style={{ color: "red" }}>⚠️ {hasError}</p>}

      {/* Cars Grid */}
      {!isLoading && filteredCars.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {filteredCars.map((car) => (
            <div
              key={car.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              <h3>{car.name}</h3>
              <p>Price: {car.price}</p>
              <p>Power: {car.power}</p>
              <p>Fuel Type: {car.fuel_type}</p>

              {membership && <p style={{ color: "gold", fontWeight: "bold" }}>💎 Member Exclusive Discount: 15% OFF</p>}
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && filteredCars.length === 0 && <p style={{ color: "gray", marginTop: "20px" }}>No cars found matching "{searchQuery}"</p>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTOH 4: Multiple State dengan Form
// ═══════════════════════════════════════════════════════════════

function FormExample() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vehicleType: "mobil",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update specific field in object state
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div>
      <h2>Contact Form</h2>

      {submitted && <p style={{ color: "green" }}>✅ Thank you {formData.name}!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>

        <div>
          <label>Vehicle Type:</label>
          <select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange}>
            <option value="mobil">Mobil</option>
            <option value="motor">Motor</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTOH 5: Cleanup Function di useEffect
// ═══════════════════════════════════════════════════════════════

function TimerExample() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    // Set interval
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup function: clear interval when component unmounts or effect re-runs
    return () => {
      clearInterval(intervalId);
      console.log("Interval cleared!");
    };
  }, [isRunning]); // Re-run when isRunning changes

  return (
    <div>
      <h2>Timer</h2>
      <p>Seconds: {seconds}</p>
      <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DEPENDENCY ARRAY REFERENCE
// ═══════════════════════════════════════════════════════════════

/**
 * DEPENDENCY ARRAY GUIDE:
 *
 * 1. useEffect(() => {...}, [])
 *    - Empty array
 *    - Runs: 1 time (on component mount)
 *    - Use case: Initialize data once
 *
 * 2. useEffect(() => {...}, [var1, var2])
 *    - With dependencies
 *    - Runs: On mount + whenever var1 or var2 changes
 *    - Use case: Fetch data when filter changes
 *
 * 3. useEffect(() => {...})
 *    - No dependency array
 *    - Runs: On EVERY render
 *    - ❌ AVOID! Can cause infinite loops
 *
 * 4. useEffect(() => {...}, [])
 *    return () => {...}
 *    - Cleanup function
 *    - Runs: When component unmounts or before effect re-runs
 *    - Use case: Clear timers, unsubscribe
 */

// ═══════════════════════════════════════════════════════════════
// EXPORT ALL EXAMPLES
// ═══════════════════════════════════════════════════════════════

export { ContohUseState, ContohUseEffect, CatalogCars, FormExample, TimerExample };
