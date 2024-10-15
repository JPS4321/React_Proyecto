import Navbar from "../../Componentsadmins/Navbar";
import AdminUsers from "../../Componentsadmins/AdminUsers";
import { Line } from 'react-chartjs-2';

const ReportPage = () => {
    return (
      <div className='ReportPage'>
          <Navbar />
          <AdminUsers />
      </div>
    );
}
export default ReportPage;