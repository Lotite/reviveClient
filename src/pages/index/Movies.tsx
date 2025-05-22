import IndexView from "../../components/IndexView/IndexView";
import ServerApi from "../../services/ServerApi";


export default function Movies() {

  return (<IndexView request={ServerApi.getMoviesRecomentions} />);
}
