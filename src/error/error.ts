function error(status:number, msg:string) {
  var err = new Error(msg);
  (err as any).status = status;
  return err;
}

export default error;
