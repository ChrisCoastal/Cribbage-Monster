import Nav from 'src/components/Nav/Nav';
import PlayField from 'src/components/PlayField/PlayField';
import BottomNav from 'src/components/BottomNav/BottomNav';

function App() {
  return (
    <div className="relative grid grid-rows-[3rem_minmax(1fr)_3rem_3rem] h-screen max-h-screen bg-teal-100">
      <Nav />
      <div>
        <PlayField />
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
