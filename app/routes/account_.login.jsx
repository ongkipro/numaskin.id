import { redirect } from 'react-router';

export async function loader({ context }) {
  if (context?.customerAccount?.login) {
    return context.customerAccount.login();
  }
  // In development / dummy mode, redirect to account dashboard
  return redirect('/account');
}

export default function AccountLogin() {
  return null;
}
