import { useState } from 'react';
import './styles/app.css'
import ThreeScene from './components/three/ThreeScene.jsx';


export default function App() {
    

    const fruits = [
        "Apple",
        "Apricot",
        "Banana",
        "Blueberry",
        "Cherry",
        "Cranbery",
        "Dragonfruit",
        "Elderberry",
        "Fig",
        "Grape",
    ];

    
    const [searchTerm, setSearchTerm] = useState("");
    
    // Check if the fruit contains the search letters in order (not necessarily consecutive)
    const isMatch = (fruit, query) => {
        const lowerFruit = fruit.toLowerCase();
        const lowerQuery = query.toLowerCase();
        let queryIndex = 0;

        for (let i = 0; i < lowerFruit.length && queryIndex < lowerQuery.length; i++) {
        if (lowerFruit[i] === lowerQuery[queryIndex]) {
            queryIndex++;
        }
        }
        return queryIndex === lowerQuery.length;
    };

    // Highlight the matched letters
    const highlightMatch = (fruit, query) => {
        if (!query) return fruit;

        const lowerFruit = fruit.toLowerCase();
        const lowerQuery = query.toLowerCase();
        const result = [];
        let queryIndex = 0;

        for (let i = 0; i < fruit.length; i++) {
        if (
            queryIndex < lowerQuery.length &&
            lowerFruit[i] === lowerQuery[queryIndex]
        ) {
            result.push(<strong key={i}>{fruit[i]}</strong>);
            queryIndex++;
        } else {
            result.push(fruit[i]);
        }
        }

        return result;
    };

    const dataFilter = fruits.filter((fruit) => isMatch(fruit, searchTerm));

    return (
        <main className="app-shell">           
          <div>
            <h1 className="header font-extrabold text-5xl">SLMN Search</h1>
            <input 
                type="text" 
                placeholder="Search here..." 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="border p-3 my-10">               
            </input>

            <div className="list">
                {dataFilter.map((fruit) => (
                    <div key={fruit} className="p-5">
                    {highlightMatch(fruit, searchTerm)}
                    </div>
                ))}
            </div>

            {/* <div className="list">
                {dataFilter.map((fruit) => {
                const matchLength = searchTerm.length;
                const matchedPart = fruit.slice(0, matchLength);
                const restPart = fruit.slice(matchLength);

                return (
                    <div key={fruit} className="p-5">
                        <strong>{matchedPart}</strong>
                        {restPart}
                    </div>
                    );
                })}
            </div> */}
            
            
           {/*  <div className="list">
                {dataFilter.map((fruit) => {
                    return <div className="p-5">{fruit}</div>;
                })}
            </div> */}
            
          </div>
          <ThreeScene/>
        </main>
    );
};
