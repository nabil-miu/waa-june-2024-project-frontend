import { useNavigate } from "react-router";

export default function Event(props) {
  const navigate = useNavigate();

  const onShowDetailButtonClicked = (id) => {
    navigate("/event-detail/" + id);
  };

  return <div></div>;
}
