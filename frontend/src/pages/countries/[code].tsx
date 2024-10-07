import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY_BY_CODE } from "@/graphql/CountryQueries";
const CountryDetails = () => {
  const router = useRouter();
  const { code } = router.query;
  const { data, loading, error } = useQuery(GET_COUNTRY_BY_CODE, {
    variables: { code },
  });
  if (loading) return <p>Loading country...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const country = data.country;
  return (
    <div className="details-container">
      <div className="details-card">
        <p className="details-emoji">{country?.emoji}</p>
        <h1 className="details-name">
          Name: {country?.name} ({country?.code})
        </h1>
        <p className="details-continent">
          Continent: {country?.continent?.name}
        </p>
      </div>
    </div>
  );
};
export default CountryDetails;
