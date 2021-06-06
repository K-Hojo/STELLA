import React from 'react';
import { Box, Typography } from '@material-ui/core';


const About = () => {
  return (
    <div>
      <Typography variant="h5" align="center" component="div">
        <Box lineHeight={5}>
        コンステレーション
        </Box>
      </Typography>
      <Typography variant="h6" align="center" component="div">
        <Box lineHeight={5}>
        一つ一つは意味を持たない星の配置が星座となったときに物語を生むように、
        <br/>
        無関係に思われていた事柄が全体として意味を含んでいるように見えてくることをいいます。
        </Box>
      </Typography>
    </div>
  )
}

export default About;