# Chord Identifier Prototype

This project provides a prototype web application for real-time chord identification, through either microphone input or pre-recorded samples. The application utilises a CNN optimised for individual pitch recognition within chords.

After uploading audio, the application will provide the raw notes played (accurate to the octave), possible chord names, as well as fretboard diagrams of feasible positions where the chord could be played.

The application consists of a fastapi backend that facilitates communication with the model, and a react-based frontend that facilitates user upload and display of relevant predictions.

## Installation

1. Clone the repository.

2. Create and activate a virtual environment for the backend application:
```bash
cd back
python -m venv .venv
.venv\Scripts\Activate
```

3. Install backend dependencies: 
`pip install -r requirements.txt`

4. Start the API:
`fastapi dev main.py`

5. Install frontend dependencies in a new terminal window:
```bash 
cd front
npm install
```

6. Start the frontend module:
`npm run dev`

## Using the project

Access `localhost:5173` to interact with the application. Microphone input can be recorded and played-back via the top-left button, or files can be manually uploaded with the button below - provided they are in WAV format.

Chord names are display on the right-hand side, along with the raw notes played.

The fretboard diagram is displayed along the bottom; where applicable, multiple diagrams can be switched-between using the dots below.

## Testing

The application includes extensive testing of frontend functionality as well as testing of the backend API call.

To run backend testing: `cd back -> pytest`

To run frontend tests `cd front -> npm test`

Code coverage metrics are provided for frontend tests; builds will fail if below 90% coverage. A linting stage is also used within the pipeline to ensure code quality: `npm run lint`.