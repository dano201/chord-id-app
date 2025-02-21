import React from "react";

const Fretboard = ({ fretting }) => {
    const numFrets = 15, numStrings = 7;
    const stringNames = ["", "E", "A", "D", "G", "B", "E"];
     
    const boardStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${numFrets}, 60px)`,
        gridTemplateRows: `repeat(${numStrings}, 30px)`,
        position: "relative",
        border: "3px solid black",
    };

    const stringThickness = ["3.2px", "2.8px", "2.4px", "2.2px", "1.8px", "1.5px"];

    return (
        <div>

            {/* Fret numbers */}
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${numFrets}, 60px)` }}>
                {[...Array(numFrets)].map((_, fret) => (
                    <div key={fret} style={{
                        width: "60px",
                        height: "30px",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingBottom: "5px",
                        fontWeight: "bold"
                    }}>
                        {fret === 0 ? "" : fret}
                    </div>
                ))}
            </div>

            <div style={boardStyle}>
                {[...Array(numStrings * (numFrets))].map((_, index) => {
                    const row = Math.floor(index / (numFrets));
                    const col = index % (numFrets);

                    const isPlayed = fretting.some(note => note.string === row-1 && note.fret === col);
                    const isOpen = fretting.some(note => note.string === row-1 && note.fret === 0);

                    const rowStyle = {
                        width: "60px",
                        height: "30px",
                        borderBottom: col === 0 ? "none" : `${stringThickness[row]} solid black`,
                        borderRight: col > 0 ? "2px solid black" : "4px solid black",
                        position: "relative",
                        fontWeight: col === 0 ? "bold" : "normal",
                        bottom: col === 0 ? "0%" : "0%",
                    };

                    const frettedStyle = {
                        width: "18px",
                        height: "18px",
                        backgroundColor: "black",
                        borderRadius: "50%",
                        position: "relative",
                        left: "50%",
                        top: "5%",
                        transform: "translate(-50%, -50%)"
                    }

                    const openStyle = {
                        display: "inline-flex",
                        width: "22px",
                        height:"22px",
                        border: "2.25px solid black",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        top: "-40%",
                    }

                    const labelStyle = {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        position: "relative",
                        top: "-40%",
                    }

                    const stringLabel = isOpen ? (
                        <div style={openStyle}> 
                            {stringNames[row]}
                        </div> 
                    ) : ( <div style = {labelStyle}>
                        {stringNames[row]}
                        </div>
                    ) 
                    
                    return (
                        <div key={index} style={rowStyle}>

                            {/* String names */}
                            {col === 0 ? stringLabel : null}

                            {/* Fretted notes */}
                            {isPlayed && !isOpen &&  (
                                <div style={frettedStyle}/>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Fretboard;



