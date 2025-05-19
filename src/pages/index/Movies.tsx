import IndexView from "../../components/IndexView.tsx/IndexView";
import ServerApi from "../../services/ServerApi";


export default function Movies() {

  return (<IndexView request={ServerApi.getMoviesRecomentions} />);
}
