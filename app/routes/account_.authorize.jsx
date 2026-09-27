import { redirect } from 'react-router';

export async function loader({ context }) {
  if (context?.customerAccount?.authorize) {
    return context.customerAccount.authorize();
  }
  return redirect('/account');
}

export default function AccountAuthorize() {
  return null;
}
