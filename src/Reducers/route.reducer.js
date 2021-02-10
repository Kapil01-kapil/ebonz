import {Routes} from "../Constants/Routes"
const initialState={route:Routes.Splash}
export function routes(state=initialState,action)
{
    switch(action.type)
    {
            case Routes.Splash:
                return {route:Routes.Splash}

            case Routes.RegisterScreen:
                return {route:Routes.RegisterScreen}

            case Routes.LoginScreen:
                return {route:Routes.LoginScreen}

            case Routes.OTPScreen:
                return {route:Routes.OTPScreen}

            case Routes.SetPassword:
                return {route:Routes.SetPassword}

            case Routes.HomeScreen:
                return {route:Routes.HomeScreen}

            default:return  state;
    }

}