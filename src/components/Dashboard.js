import {Switch, Route, Redirect} from "react-router-dom";
import { Config } from "./Config";
import { Editar } from "./Editar";
import { ListPass } from "./ListPass";
import { Acercade } from "./Acercade";
import { Nuevo } from "./nuevo";
import { Menu } from "./Menu";
import { useForm } from "../hooks/useForm";
// import { dark_light } from "../functions/dark_light";

export const Dashboard = ({setSession,changeMode,valueMode})=>{


    const [{buscar}, setValues] = useForm({buscar:''});

    return(
        <>
            <Menu setSession={setSession} change={setValues} buscar={buscar} />
            <Switch>
                <Route exact path="/listpass" ><ListPass buscar={buscar} history={history} valueMode={valueMode} /> </Route>
                <Route exact path="/nuevo" component={Nuevo} />
                <Route exact path="/editar/:ID" component={Editar} />
                <Route exact path="/config"> <Config changeMode={changeMode} valueMode={valueMode} /> </Route>
                <Route exact path="/acerca" component={Acercade} />
                <Redirect to="/listpass" />
            </Switch>
        </>
    );
}