import { redirect } from 'react-router';

export async function loader() {
  return redirect('/collections/all-products', 301);
}

export default function ProductsIndexRedirect() {
  return null;
}
