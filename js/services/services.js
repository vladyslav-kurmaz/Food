const postData = async (url, data) => {
    const rel = await fetch(url, {
          method: 'POST',
          headers: {'Content-type':'application/json; charset=utf-8'},
          body: data,
        }
      ); 

    return await rel.json();
  };

  const getRequest = async (url) => {
    const rec = await fetch(url);

    if (rec.status !== 200) {
      throw new Error(`Oops we have problems with ${url}, status ${rec.status}`);
    }

    return await rec.json();
  };

export {postData};
export {getRequest};