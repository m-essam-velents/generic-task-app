import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { APIU, Cookies } from "../service";
import axios from "axios";

interface ReusableComponent {
  api: any;
}
interface Props {
  name: string;
  Create: React.FC<ReusableComponent>;
  Update: React.FC<ReusableComponent>;
  List: React.FC<ReusableComponent>;
  Show: React.FC<ReusableComponent>;
}
const token = Cookies.getCookie("token");

const axiosInstance = axios.create({
  baseURL: APIU,
  headers: {
    Authorization: "Bearer " + token,
  },
});

const Tasks: React.FC<Props> = ({ name, Create, Update, List, Show }) => {
  // first crete routing system according to name

  const createItem = async () => await axiosInstance.post(`${name}`);
  const updateItem = async ({ id }: { id: string }) =>
    await axiosInstance.put(`${name}/${id}`);
  const showItem = async ({ id }: { id: string }) =>
    await axiosInstance.get(`${name}/${id}`);
  const listItems = async () => await axiosInstance.get(`${name}`);

  const CustomRoutes = () => (
    <Router>
      <Route
        exact
        path={`/${name}/create`}
        render={() => <Create api={createItem} />}
      />
      <Route
        exact
        path={`/${name}/update/:id`}
        render={() => <Update api={updateItem} />}
      />
      <Route
        exact
        path={`/${name}/list`}
        render={() => <List api={listItems} />}
      />
      <Route
        exact
        path={`/${name}/show/:id`}
        render={() => <Show api={showItem} />}
      />
    </Router>
  );
  return (
    <div>
      <CustomRoutes />
    </div>
  );
};

export default Tasks;
