import { CircularProgress } from '@/components';

export default function Loading() {
  return <div style={{width:"100%", height: "100vh", display:"flex", alignItems:"center", justifyContent:"center"}}><CircularProgress /></div>;
}
