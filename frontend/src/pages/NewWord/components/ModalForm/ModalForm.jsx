export const Form = ({ word, setWord, getPhotoData }) => {
  const changeWord = (e) => {
    setWord(e.target.value);
  };
  return (
    <form action="" onSubmit={getPhotoData} className="my-3">
      <div className="row">
        <div className="col-9">
          <input
            className="form-control"
            type="text"
            placeholder="画像を検索"
            onChange={changeWord}
            value={word}
          />
        </div>
        <div className="col-3 row">
          <button className="btn btn-primary" type="submit">
            検索
          </button>
        </div>
      </div>
    </form>
  );
};
