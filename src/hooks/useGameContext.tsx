import { useContext } from 'react';
import { GameContext } from 'src/context/GameProvider/GameProvider';

const useGameContext = () => useContext(GameContext);

export default useGameContext;
