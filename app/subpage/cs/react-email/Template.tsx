import * as React from 'react';
import {Button, Html, Text} from "@react-email/components";

export function Template({verification_code}:{
    verification_code: string;
}) {
    return (
        <Html lang={'ko'}>
            <Button>Click me</Button>
            <Text>
                verification code : {verification_code}
            </Text>
        </Html>
    )
};