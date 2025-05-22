import IndexView from "../../components/IndexView/IndexView";
import ServerApi from "../../services/ServerApi";


export default function Home() {

  return (<IndexView request={ServerApi.getHomeRecomentions} />);
}
