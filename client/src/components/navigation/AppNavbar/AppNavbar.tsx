import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

interface link {
  title: string,
  href: string;
};

const links: link[] = [
  {
    title: 'My Projects',
    href: '/'
  },
  {
    title: 'My Learning',
    href: '/learning'
  }
];

/**
 * Renders the shared top-level navigation bar for the TechUp app shell.
 *
 * @returns The persistent app navigation with home and learning links.
 */
export default function AppNavbar() {
  return (
    <AppBar
      component="nav"
      aria-label="Main navigation"
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: '1px solid rgba(148, 163, 184, 0.28)',
        bgcolor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, smd: 72 },
          px: { xs: 2, smd: 3 },
          gap: 1.5,
        }}
      >
        <Typography
          component={NextLink}
          href="/"
          variant="h6"
          sx={{
            color: 'text.primary',
            textDecoration: 'none',
            fontWeight: 800,
            letterSpacing: '0.02em',
          }}
        >
          TechUp
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {
          links.map((link, index) => (
            <Button
              key={index}
              component={NextLink}
              href={link.href}
              color="inherit"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {link.title}
            </Button>
          ))
        }
      </Toolbar>
    </AppBar>
  );
}
