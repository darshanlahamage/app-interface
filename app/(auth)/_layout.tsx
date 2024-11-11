import { Stack } from 'expo-router';

const Layout = ()=> {
  return (
   
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="adhar" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />      
      </Stack>

  );
}

export default Layout;
