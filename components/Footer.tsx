import { Anchor, Box, Group, List, Stack, Text, Image, Center } from '@mantine/core'
import * as React from 'react'
import { VERSION } from '../utils.client'

export function Footer(props: {
  maxWidth?: string
}) {
  return (
    <Box p={48}> 
      <Stack spacing={2} mt={12} align="center">
        <Image width={8} src="/images/artworks/logo-gray-256.png" />
        <Text size="sm" align="right" color="gray.500">
          v{VERSION}
        </Text>
      </Stack>
    </Box>
  )
}
