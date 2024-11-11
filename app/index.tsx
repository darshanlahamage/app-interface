import { Redirect } from "expo-router";



const Home = () => {
    return <Redirect href={"/(auth)/welcome"} />
    // return <Redirect href={"/(auth)/adhar"} />
    // return <Redirect href={"/(root)/(tabs)/home"} />
}

export default Home;