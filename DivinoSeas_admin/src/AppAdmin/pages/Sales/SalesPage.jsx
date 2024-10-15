import "./SalesPage.css"
import Navbar from '../../Componentsadmins/Navbar';
import Salesbar from "../../Componentsadmins/Salesbar" 

const Sales = () => {
    return (
      <div className='SalesPage'>
          <Navbar />
          <Salesbar />
      </div>
    );
}
export default Sales;
