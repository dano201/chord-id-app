import React from "react";

const Fretboard = ({ fretting }) => {
    const numFrets = 15, numStrings = 6;
    const stringNames = ["E", "A", "D", "G", "B", "E"];
     
    const boardStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${numFrets}, 60px)`,
        gridTemplateRows: `repeat(${numStrings}, 30px)`,
        position: "relative",
        border: "3px solid black",
    };


    return (
        <div>

            {/* Fret numbers */}
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${numFrets}, 60px)` }}>
                {[...Array(numFrets)].map((_, fret) => (
                    <div key={fret} style={{
                        width: "60px",
                        height: "20px",
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

                    const isPlayed = fretting.some(note => note.string === row && note.fret === col);
                    const isOpen = fretting.some(note => note.string === row && note.fret === 0);

                    const rowStyle = {
                        width: "60px",
                        height: "30px",
                        borderBottom: col === 0 ? "none" : "2px solid black",
                        borderRight: col > 0 ? "2px solid black" : "4px solid black",
                        position: "relative",
                        fontWeight: col === 0 ? "bold" : "normal",
                        
                    };

                    const frettedStyle = {
                        width: "12px",
                        height: "12px",
                        backgroundColor: "black",
                        borderRadius: "50%",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)"
                    }

                    const openStyle = {
                        display: "inline-flex",
                        width: "22px",
                        height:"22px",
                        border: "2px solid black",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                    }

                    const stringLabel = isOpen ? (
                        <div style={openStyle}> 
                            {stringNames[row]}
                        </div> 
                    ) : stringNames[row]; 
                    
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



