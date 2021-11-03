import CreateJob from "../../components/createjob/CreateJob";
import Sidebar from "../../components/sidebar/Sidebar";
import '../../pages/manage/manage.scss';
export default function NewJob() {
  return (
    <>
      <div className="manage_container" onLoad={window.scrollTo(0, 0)}>
        <Sidebar />
        <CreateJob />
      </div>

    </>
  );
}
