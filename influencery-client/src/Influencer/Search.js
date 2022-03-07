import { useState, useEffect } from "react";
import InfluencerCard from "./Card";
import styled from "styled-components";

const InfluencerSearch = () => {
  const [influencers, setInfluencers] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [sortString, setSortString] = useState("name");
  const [platformString, setPlatformString] = useState("all");

  useEffect(() => {
    getInfluencers();
  }, []);

  const getInfluencers = () =>
    fetch("http://localhost:3000/api/v1/influencers", {
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setInfluencers(data));


  const sortCriteria = (a, b) => {
    switch (sortString) {
      case "name_asc":
        return sortByName(a, b);
      case "name_desc":
        return sortByNameDesc(a, b);
      case "followers_asc":
        return sortByNumOfFollowers(a, b);
      case "followers_desc":
        return sortByNumOfFollowersDesc(a, b);
      default:
        return sortByName(a, b);
    }
  }

  const sortByNumOfFollowers = (a, b) => a.followers - b.followers;
  const sortByNumOfFollowersDesc = (a, b) => b.followers - a.followers;
  const sortByName = (a, b) => {
    const handleA = a.handle.toLowerCase();
    const handleB = b.handle.toLowerCase();
    return handleA < handleB ? -1 : handleA > handleB ? 1 : 0;
  }
  const sortByNameDesc = (a, b) => {
    const handleA = a.handle.toLowerCase();
    const handleB = b.handle.toLowerCase();
    return handleA < handleB ? 1 : handleA > handleB ? -1 : 0;
  }
  const platformFilterCriteria = influencer => platformString === "all" ? true : influencer.platform.name.includes(platformString);
  const influencerFilterCriteria = influencer =>
    influencer.handle.includes(searchString)
    || [...influencer.tags, influencer.primary_tag].some(tag => tag.name.includes(searchString))
    || influencer.platform.name.includes(searchString);

  return (
    <div>
      <SearchInputContainer>
        <SelectInput
          value={sortString}
          onChange={(e) => setSortString(e.target.value)}
          name="sort"
          id="sort"
        >
          <option value="name_asc">Sort by: Name ASC</option>
          <option value="name_desc">Sort by: Name DESC</option>
          <option value="followers_asc">Sort by: Followers ASC</option>
          <option value="followers_desc">Sort by: Followers DESC</option>
        </SelectInput>
        <Form>
          <SearchInput
            placeholder="Enter influencer handle, platform, or tag"
            type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          >
          </SearchInput>
          <ClearBtn onClick={() => setSearchString("")}>X</ClearBtn>
        </Form>
        <SelectInput
          value={platformString}
          onChange={(e) => setPlatformString(e.target.value)}
          name="platforms"
          id="platforms"
        >
          <option value="all">All</option>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
          <option value="facebook">Facebook</option>
          <option value="tiktok">Tik-Tok</option>
          <option value="youtube">Youtube</option>
        </SelectInput>
      </SearchInputContainer>
      <SearchContainer>
        {!influencers && <Loader />}
        <div>
          {!!influencers && influencers
            .filter(influencer => influencer.primary_tag.name.includes(searchString))
            .filter(influencerFilterCriteria)
            .filter(platformFilterCriteria)
            .sort(sortCriteria)
            .map((inf, i) => (
              <InfluencerCard influencer={inf} setSearchString={setSearchString} key={"inf_card_" + i} />
            ))}
        </div>
        <div>
          {!!influencers && influencers
            .filter(influencer => !influencer.primary_tag.name.includes(searchString))
            .filter(influencerFilterCriteria)
            .filter(platformFilterCriteria)
            .sort(sortCriteria)
            .map((inf, i) => (
              <InfluencerCard influencer={inf} setSearchString={setSearchString} key={"inf_card_" + i} />
            ))}
        </div>
      </SearchContainer>
    </div>
  );
};

const Form = styled.div`
  position: relative;
  display: inline-block;
`;

const ClearBtn = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  height: 10px;
  cursor: pointer;
  border: none;
  background: none;
`;

const SelectInput = styled.select`
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  border: 2px solid #2d9fd9;
  color: grey;
  min-width: 100px;
  height: 35px;
  padding-left: 10px;
  &:focus {
    outline: none;
    border: 2px solid #ee7622;
    color: grey;
  }
  margin: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 20vw 30px 20vw;
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: loader-spin 2s linear infinite;
  position: absolute;
  top: 45vh;
`;

const SearchInput = styled.input`
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  border: 2px solid #2d9fd9;
  color: grey;
  width: 300px;
  height: 30px;
  padding-left: 20px;
  &:focus {
    outline: none;
    border: 2px solid #ee7622;
    color: grey;
  }
  margin: 10px;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  position: fixed;
  background-color: #f2f2f2;
  z-index: 1000;
`;

export default InfluencerSearch;
