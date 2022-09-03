import React, {useContext} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteContext from "../../contexts/favoriteContext"

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PokemonCard({ name, image, types, moves }) {
  const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext)
  const favoriteClick = () => {
    updateFavoritePokemons(name)
  }
  const heart = favoritePokemons.includes(name) ? "❤️" : "🖤";
  const typeHandler = () => {
    if (types[1]) {
      return "Type Pokemon:" + types[0].type.name + " and " + types[1].type.name;
    }
    return "Type Pokemon:" + types[0].type.name;
  };
  const moveHandler = () => {
    if (moves[1]) {
      return "Pokemon skills:" + moves[0].move.name + " , " + moves[1].move.name + " and " + moves[2].move.name ;
    }
    return "Pokemon skills:" + moves[0].move.name;
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
              <IconButton onClick={favoriteClick} >
            {heart}
            </IconButton>
            </Typography>
        <CardMedia component="img" height="250" image={image} alt="Pokemon" />
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
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
        <Typography gutterBottom variant="h6" component="div">
              {typeHandler()}
            </Typography>
          <Typography gutterBottom variant="h6" component="div">
           {moveHandler()}
          </Typography>
        </CardContent>
      </Collapse>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
