import Link from "next/link";
import { GET_ALL_COUNTRIES } from "@/graphql/CountryQueries";
import { CREATE_NEW_COUNTRY } from "@/graphql/CountryMutations";
import { useQuery, useMutation } from "@apollo/client";
import { Country } from "@/types";
import { useState, useEffect } from "react";

export default function Countries() {
  const { data, loading, error } = useQuery(GET_ALL_COUNTRIES);
  const [createCountry] = useMutation(CREATE_NEW_COUNTRY, {
    onCompleted(data) {
      console.log("Country added:", data.addCountry);
    },
    onError(error) {
      console.error("Error adding country:", error);
    },
    refetchQueries: [{ query: GET_ALL_COUNTRIES }],
  });

  const [newCountry, setNewCountry] = useState({
    name: "",
    emoji: "",
    code: "",
  });

  useEffect(() => {
    if (data) {
      console.log("Fetched countries:", data.countries);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCountry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCountry({ variables: { data: newCountry } });
      setNewCountry({ name: "", emoji: "", code: "" });
    } catch (error) {
      console.error("Error while creating country:", error);
    }
  };

  return (
    <div>
      <h1>Countries</h1>
      <form onSubmit={handleSubmit} className="country-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newCountry.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emoji">Emoji</label>
          <input
            type="text"
            id="emoji"
            name="emoji"
            value={newCountry.emoji}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Code</label>
          <input
            type="text"
            id="code"
            name="code"
            value={newCountry.code}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
      <div className="countries-container">
        {data.countries.map((country: Country) => (
          <div key={country.id} className="country-card">
            <Link href={`/countries/${country.code}`}>
              <div>
                <h3>{country.name}</h3>
                <p>{country.emoji}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
