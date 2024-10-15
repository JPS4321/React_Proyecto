import Navbar from "../../Componentsadmins/Navbar";
import Report from "../../Componentsadmins/Report";
import "./ReportPage.css"
import { Line } from 'react-chartjs-2';

const ReportPage = () => {
    return (
      <div className='ReportPage'>
          <Navbar />
          <Report />
      </div>
    );
}
export default ReportPage;