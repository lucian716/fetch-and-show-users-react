import "./App.scss";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({
    // results: [],
  });

  const [users, setUsers] = useState([]);

  const [searchData, setSearchData] = useState("");

  const { results } = data;

  useEffect(() => {
    // fetch("https://randomuser.me/api/?inc=name,picture&results=48")
    // .then((data) => {
    //   return data.json();
    // })
    // .then((data) => {
    //   setData(data);
    // })
    // .catch((error) => { console.log(error) });

    (async () => {
      const rawData = await fetch(
        "https://randomuser.me/api/?inc=name,picture&results=48"
      );
      const data = await rawData.json();
      setData(data);
      setUsers(data?.results || []);
    })();
  }, []);

  useEffect(() => {
    const newUsers = results?.filter((user) => {
      if (
        user.name.first.toLowerCase().includes(searchData) ||
        user.name.last.toLowerCase().includes(searchData) ||
        user.name.title.toLowerCase().includes(searchData)
      ) {
        return true;
      }
      return false;
    });
    console.log(newUsers);

    setUsers(newUsers || []);

  }, [searchData]);

  return (
    <div id="app">
      <h1>List of users</h1>
      <div className="container">
        <input
          id="filter"
          className="form-control mb-3 form-control-lg"
          placeholder="Type to filter..."
          onChange={(event) => {
            setSearchData(event.target.value.toLowerCase());
          }}
        ></input>
        <div className="users row">
          {users?.map((item, index) => {
            const finalName = `
                    ${item.name.title}
                    ${item.name.first}
                    ${item.name.last}`;
            return (
              <div className="col-2 user" key={`item -${index}`}>
                <img src={item.picture.thumbnail} alt={finalName} />
                <h3>{finalName}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
