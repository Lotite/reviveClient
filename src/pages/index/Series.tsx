import IndexView from "../../components/IndexView/IndexView";
import ServerApi from "../../services/ServerApi";


export default function Series() {

  return (<IndexView 
      requestRecomendation={ServerApi.getSeriesRecomentions} 
      requestCarousel={() => ServerApi.getCarouselMedia("serie")}
      />);
}
