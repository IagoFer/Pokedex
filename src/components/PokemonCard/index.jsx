import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteContext from "../../contexts/favoriteContext";
import axios from 'axios';

interface ExpandMoreProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PokeCard = styled(Card)({
  maxWidth: 290,
  border: '1px solid #FF0000',
  borderRadius: 15,
  backgroundColor: '#F0F0F0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  '& .MuiCardActionArea-root': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
});

const PokeTypography = styled(Typography)({
  color: '#333',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '10px 0',
  fontFamily: 'Roboto, sans-serif',
});

const PokeCardMedia = styled(CardMedia)({
  width: '100%',
  height: '120px',
  objectFit: 'contain',
});

const PokeBox = styled(Box)({
  width: '85%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#FFF',
  borderRadius: 50,
  padding: 5,
  margin: '10px 0',
  border: '1px solid #000',
});

const PokeCollapse = styled(Collapse)({
  width: '85%',
});

const PokeCardContent = styled(CardContent)({
  width: '85%',
});

const typeColors = {
  grass: '#78C850',
  fire: '#F08030',
  water: '#6890F0',
  bug: '#A8B820',
  normal: '#A8A878',
  poison: '#A040A0',
  electric: '#F8D030',
  ground: '#E0C068',
  fairy: '#EE99AC',
  fighting: '#C03028',
  psychic: '#F85888',
  rock: '#B8A038',
  ghost: '#705898',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  flying: '#A890F0',
};

const typeTranslations = {
  grass: 'Grama',
  fire: 'Fogo',
  water: 'Água',
  bug: 'Inseto',
  normal: 'Normal',
  poison: 'Veneno',
  electric: 'Elétrico',
  ground: 'Terra',
  fairy: 'Fada',
  fighting: 'Lutador',
  psychic: 'Psíquico',
  rock: 'Pedra',
  ghost: 'Fantasma',
  ice: 'Gelo',
  dragon: 'Dragão',
  dark: 'Sombrio',
  steel: 'Aço',
  flying: 'Voador',
};

const moveTranslations = {
  "tackle": "Investida",
  "tail-whip": "Chicote de Cauda",
  // Adicione outras traduções conforme necessário
};

const abilityTranslations = {
  "overgrow": "Crescimento Exagerado",
  "blaze": "Chama",
  // Adicione outras traduções conforme necessário
};

const getPokemonData = async (pokemonName) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
};

export default function PokemonCard({ name, image, types, moves, abilities }) {
  const { favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext);
  const [expanded, setExpanded] = useState(false);
  const [bgColor, setBgColor] = useState('#FFF');

  const favoriteClick = () => {
    updateFavoritePokemons(name);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonData(name.toLowerCase());
      if (data && data.types && data.types.length > 0) {
        setBgColor(typeColors[data.types[0].type.name] || '#FFF');
      }
    };
    fetchData();
  }, [name]);

  const heart = favoritePokemons.includes(name) ? "❤️" : "🖤";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const typeHandler = () => {
    if (types.length === 2) {
      return `Tipos do Pokémon: ${typeTranslations[types[0].type.name]} e ${typeTranslations[types[1].type.name]}`;
    } else {
      return `Tipo do Pokémon: ${typeTranslations[types[0].type.name]}`;
    }
  };

  const moveHandler = () => {
    if (moves[1]) {
      return (
        "Movimentos do Pokémon: " +
        moves[0].move.name +
        ", " +
        moves[1].move.name +
        " e " +
        moves[2].move.name
      );
    }
    return "Movimento do Pokémon: " + moves[0].move.name;
  };
  const abilitiesHandler = () => {
    if (abilities[1]) {
      return (
        "Habilidades do Pokémon: " +
        abilities[0].ability.name +
        " e " +
        abilities[1].ability.name
      );
    }
    return "Habilidade do Pokémon: " + abilities[0].ability.name;
  };
  const getAnimatedImage = (name) => {
    return `https://projectpokemon.org/images/normal-sprite/${name.toLowerCase()}.gif`;
  };

  return (
    <PokeCard style={{ backgroundColor: bgColor }}>
      <CardActionArea>
        <PokeTypography variant="h4" component="div">
          {name}
          <IconButton onClick={favoriteClick}>{heart}</IconButton>
        </PokeTypography>
        <PokeCardMedia component="img" image={getAnimatedImage(name)} alt="Pokemon" />
        <PokeBox>
          <CardActions disableSpacing>
            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <PokeCollapse in={expanded} timeout="auto" unmountOnExit>
            <PokeCardContent>
              <Typography sx={{ backgroundColor: bgColor, color: '#FFF', padding: 1, borderRadius: 1, fontFamily: 'Roboto, sans-serif', fontSize: '16px', margin: '5px 0' }} gutterBottom variant="h6" component="div">
                {typeHandler()}
              </Typography>
              <Typography sx={{ backgroundColor: bgColor, color: '#FFF', padding: 1, borderRadius: 1, fontFamily: 'Roboto, sans-serif', fontSize: '16px', margin: '5px 0' }} gutterBottom variant="h6" component="div">
                {moveHandler()}
              </Typography>
              <Typography sx={{ backgroundColor: bgColor, color: '#FFF', padding: 1, borderRadius: 1, fontFamily: 'Roboto, sans-serif', fontSize: '16px', margin: '5px 0' }} gutterBottom variant="h6" component="div">
                {abilitiesHandler()}
              </Typography>
            </PokeCardContent>
          </PokeCollapse>
        </PokeBox>
      </CardActionArea>
    </PokeCard>
  );
}
