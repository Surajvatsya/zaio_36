
import NavbarForCodeDemo from "../../../components/NavbarForCodeDemo/NavbarForCodeDemo";
import CodeDemo from "../../../containers/CodeDemo/CodeDemo";

export default function CodePageDemo(props) {

  return (
    <>
      <NavbarForCodeDemo />
      <CodeDemo
        lecture={{
          editor: "",
          checkpoint: [
            { checkpointtime: 0, checkpointdataurl: "coding-env-intro-3lhv3", checkpointpause: "false" },
            { checkpointtime: 141, checkpointdataurl: "https://codesandbox.io/embed/coding-env-test-1-5j5h6?fontsize=14&theme=dark&module=%2Findex.html", checkpointpause: "false" },
            { checkpointtime: 307, checkpointdataurl: "https://codesandbox.io/embed/coding-env-test-2-d1khn?fontsize=14&theme=dark&module=%2Findex.html", checkpointpause: "true" },
          ],
        }}
        lectureName='Demo'
        unitName='Interactive Environment'
        courseName='Zaio'
      />
    </>
  );
}
