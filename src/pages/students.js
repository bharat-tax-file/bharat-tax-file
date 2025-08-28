export default function Students({ students }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Student List</h1>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} ({s.age} years old)
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/students");
  const students = await res.json();

  return {
    props: { students },
  };
}
