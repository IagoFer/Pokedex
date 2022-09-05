import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteContext from "../../contexts/favoriteContext";

interface ExpandMoreProps extends IconButtonProps {
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

export default function PokemonCard({ name, image, types, moves, abilities }) {
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);
  const favoriteClick = () => {
    updateFavoritePokemons(name);
  };
  const heart = favoritePokemons.includes(name) ? "❤️" : "🖤";
  const typeHandler = () => {
    if (types[1]) {
      return (
        "POKEMON TYPE : " + types[0].type.name + " and " + types[1].type.name
      );
    }
    return "POKEMON TYPE : " + types[0].type.name;
  };
  const moveHandler = () => {
    if (moves[1]) {
      return (
        "POKEMON MOVES : " +
        moves[0].move.name +
        " , " +
        moves[1].move.name +
        " and " +
        moves[2].move.name
      );
    }
    return "POKEMON MOVES : " + moves[0].move.name;
  };
  const abilitiesHandler = () => {
    if (abilities[1]) {
      return (
        "POKEMON POWERS : " +
        abilities[0].ability.name +
        " , " +
        abilities[1].ability.name
      );
    }
    return "POKEMON POWERS : " + abilities[0].ability.name;
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardActionArea>
        <Typography gutterBottom variant="h4" component="div">
          {name}
          <IconButton onClick={favoriteClick}>{heart}</IconButton>
        </Typography>
        <CardMedia component="img" height="250" image={image} alt="Pokemon" />
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography
                  sx={{ backgroundColor: "Green" }}
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {typeHandler()}
                </Typography>
                <Typography
                  sx={{ backgroundColor: "#00beff" }}
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {moveHandler()}
                </Typography>
                <Typography
                  sx={{ backgroundColor: "orange" }}
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {abilitiesHandler()}
                </Typography>
              </CardContent>
            </Collapse>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
