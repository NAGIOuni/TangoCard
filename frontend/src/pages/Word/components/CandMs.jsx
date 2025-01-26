export const CandMs = ({ word }) => {
  console.log(word);
  return (
    <ul className="list-group">
      {word.meanings
        ? word.meanings.map((classAndMeaning) => (
            <li key={classAndMeaning.id} className="list-group-item">
              <div className="row">
                <div className="col-2 m-auto">
                  <h4 className="text-center">{classAndMeaning.class}</h4>
                </div>
                <div className="col-10">
                  <ol className="list-group list-group-numbered list-group-flush">
                    {classAndMeaning.meanings
                      ? classAndMeaning.meanings.map((meaning) => (
                          <li className="list-group-item" key={meaning.id}>
                            {meaning.content}
                          </li>
                        ))
                      : ""}
                  </ol>
                </div>
              </div>
            </li>
          ))
        : ""}
    </ul>
  );
};
