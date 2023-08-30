import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVinylDetail } from "../redux/actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getVinylDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <div>
        <p>{detail.id}</p>
        <h1>{detail.title}</h1>
        <h2>{detail.country}</h2>
        <img src={detail.cover_image} alt={detail.title} />
        <h2>{detail.year}</h2>
      </div>
    </div>
  );
};

export default Detail;
