import styled from "styled-components";
import { Search } from "react-feather";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO add a mouseover color to the results

//passed down from App in the stateP2
//handleSelect={(suggestion) => {window.alert(suggestion);}}

const SearchBar = ({darkMode}) => {
  let handleSelect = () => {
    console.log("onclicked");
  };

  //matches the value state in react state P2
  //useState("") as per stateP2

  const [value, setValue] = useState("");
  //extra state since suggestion isn't being applied at the app level.
  //getting data from the fetch instead (might change b/c fetch moved to App)
  const [suggestions, setSuggestions] = useState([]);
//called so we can navigate to product page in onclick
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/get-items")
      .then((res) => res.json())
      .then((data) => {
        //productNames so we are handling less data
        setSuggestions(
          //mapping the data so we have access to the name and id of a product
          data.data.map((item) => {
            return { name: item.name, id: item._id };
            //we need an object to be able to do name and id at same time
          })
        );

      });
  }, []);

  //filtering the suggestions based on the name(43)
  let matchedSuggestions = suggestions.filter(
    (item) =>
    //if prod name includes user's input && functions like a "then"
      item.name.toLowerCase().includes(value.toLocaleLowerCase()) && item
      //before the && is the condition after && is the result that is being returned

  );

  const location = window.location;
  //current URL

  useEffect(() => {
    //every time URL changes, if not home page, setValue to empty
    //this makes the result list disapper and empties what was written in the searchbox
    if (location.pathname !== "/") {
      setValue("");
    }
  }, [location.pathname]);
  //every time location.path is changing, the useEffect will get triggered

  return (
    <div>
      <StyledSearch>
        <StyledIcon />
        <input
          type="text"
          placeholder="Search"
          value={value}
          //onChange watches what user types in
          onChange={(ev) => setValue(ev.target.value)}
        ></input>
      </StyledSearch>

      {/* if there is a value in the searchbar, the result will show up
        if not, display is set to none */}
      <StyledUl
        style={{ display: value ? "block" : "none" }}
        darkMode={darkMode}
      >
        {/* is there a value? if yes do map fxn */}
        {value &&
          matchedSuggestions.map((item) => {
            return (
              <li
                className="styledLi"
                key={item.id}
                onClick={() => {
                  navigate(`/product/${item.id}`);
                }}
              >
                {/* returns item.name */}
                {item.name}
              </li>
            );
          })}
      </StyledUl>
    </div>
  );
};

const StyledSearch = styled.div`
  position: relative;
  input {
    text-align: center;
    border: 2px solid #94b8ff;
    border-radius: 5px;
    padding: 3px;
  }
`;
const StyledIcon = styled(Search)`
  position: absolute;
  left: 5px;
  top: 5px;
  opacity: 50%;
`;

const StyledUl = styled.ul`
  background-color: ${(props) =>( props.darkMode ? '#2C2A30' : '#94B8FF')} ;
  //color from global style
  width: 35vw;
  position: absolute;
  box-shadow: 5px 5px lightgray;
  padding: 1vh 2vw;
  //makes list appear above the bod of the website
  z-index: 500;
  height: 40vh;
  //adds scroll bar if too many results for list size
  overflow: scroll;
  //removes bullet points
  list-style: none;

  .styledLi {
    margin: 5px;
    padding: 10px;
    :hover {
      background-color: #E6E6FA;

      //color from global style
      opacity: 70%;

    }
  }
`;


export default SearchBar;