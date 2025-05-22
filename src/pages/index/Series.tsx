import IndexView from "../../components/IndexView/IndexView";
import ServerApi from "../../services/ServerApi";


export default function Series() {

  return (<IndexView request={ServerApi.getSeriesRecomentions} />);
}
