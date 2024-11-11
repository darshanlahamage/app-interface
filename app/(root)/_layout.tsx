import { Stack } from 'expo-router';

const Layout = ()=> {
  return (
   
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="ekyc" options={{ headerShown: true,
        headerStyle: {
            backgroundColor: '#0CC25F',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: "white",
         }} />
        <Stack.Screen name="creditScore" options={{ headerShown: true,
        headerStyle: {
            backgroundColor: '#0CC25F',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: "white", }} />
        <Stack.Screen name="loanApply" options={{ headerShown: true,
        headerStyle: {
            backgroundColor: '#0CC25F',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: "white", }} />
        <Stack.Screen name="successLoan" options={{ headerShown: true,
        headerStyle: {
            backgroundColor: '#0CC25F',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: "white", }} />
      </Stack>

  );
}

export default Layout;
