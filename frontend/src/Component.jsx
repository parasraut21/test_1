import {createPosition2} from './constants';
import { useSelector } from "react-redux";
const Component = () => {
 
   const Ptheme = useSelector((state) => state.Ptheme);
   const position = createPosition2(Ptheme);

  

  return <div></div>;
};

export default Component;