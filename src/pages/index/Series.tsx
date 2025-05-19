import IndexView from "../../components/IndexView.tsx/IndexView";
import ServerApi from "../../services/ServerApi";


export default function Series() {

  return (<IndexView request={ServerApi.getSeriesRecomentions} />);
}
