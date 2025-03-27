import './Fretboard.css'

const Fretboard = ({ fretting }) => {
    const numFrets = 15, numStrings = 7;
    const stringNames = ["", "E", "A", "D", "G", "B", "E"];
    
    const isBlank = (fretting.length === 0);

    const boardStyle = {
        gridTemplateColumns: `repeat(${numFrets}, 60px)`,
        gridTemplateRows: `repeat(${numStrings}, 30px)`,
        opacity: isBlank ? "0.25" : "1",
    };

    const stringThickness = ["3.5px", "3.2px", "2.8px", "2.5px", "2.2px", "2px"];

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
                        fontWeight: "bold",
                        opacity: isBlank ? "0.25" : "1",
                    }}>
                        {fret === 0 ? "" : fret}
                    </div>
                ))}
            </div>

            <div id="board" style={boardStyle}>
                {[...Array(numStrings * (numFrets))].map((_, i) => {
                    const row = Math.floor(i / (numFrets));
                    const col = i % (numFrets);
                    
                    const isPlayed = fretting.some(note => note.string === row-1 && note.fret === col);
                    const isOpen = fretting.some(note => note.string === row-1 && note.fret === 0);

                    const rowStyle = {
                        borderBottom: col === 0 ? "none" : `${stringThickness[row]} solid #bbd9ec`,
                        borderRight: col > 0 ? "2px solid #bbd9ec" : "4px solid #bbd9ec",
                        fontWeight: col === 0 ? "bold" : "normal"
                    };

                    const stringLabel = isOpen ? (
                        <div id="open"> 
                            {stringNames[row]}
                        </div> 
                    ) : ( <div id="label">
                        {stringNames[row]}
                        </div>
                    ) 
                    
                    return (
                        <div id="row" key={i} style={rowStyle}>

                            {/* String names */}
                            {col === 0 ? stringLabel : null}

                            {/* Fretted notes */}
                            {isPlayed && !isOpen &&  (
                                <div id="fretted"/>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Fretboard;



