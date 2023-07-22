import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";

export default function Profile() {
  const handleLogout = () => {
    localStorage.clear();
  };
 
  return (
    <div className="d-flex justify-content-center align-item-center" >
     <h3> {window.localStorage.getItem("name")}</h3> 
      <DropdownButton variant="secondary" size="sm"
        title={
          <FontAwesomeIcon
            icon={faUserCircle}
            className="p-1"
            size="lg"
          />
        }
      > 
        <Dropdown.Item href="/" size="sm" onClick={handleLogout}>
          Logout
        </Dropdown.Item>
      </DropdownButton>
      
    </div>
  );
}