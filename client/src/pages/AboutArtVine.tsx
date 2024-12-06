
import { useNavigate } from 'react-router-dom';


const AboutArtVine = () => {

  const navigate = useNavigate();

  const handleBack = () => {
  navigate(-1);  
  };

  return (
    
    <button className="back-button2" onClick={handleBack}>Back</button>


    );
};
  
export default AboutArtVine;