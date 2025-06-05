
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialMediaService } from '@/services/socialMediaService';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        const platform = searchParams.get('platform') || 'unknown';

        if (error) {
          throw new Error(searchParams.get('error_description') || error);
        }

        if (!code || !state) {
          throw new Error('Missing authorization code or state parameter');
        }

        // Get stored credentials for this platform
        const connection = SocialMediaService.getStoredConnection(platform);
        if (!connection?.clientId || !connection?.clientSecret) {
          throw new Error('Platform not configured properly');
        }

        // Handle OAuth callback
        await SocialMediaService.handleOAuthCallback(platform, code, state, {
          clientId: connection.clientId,
          clientSecret: connection.clientSecret,
          redirectUri: `${window.location.origin}/oauth/callback`
        });

        setStatus('success');
        setMessage(`Successfully connected your ${platform} account!`);

        // Notify parent window
        if (window.opener) {
          window.opener.postMessage({
            type: 'oauth_success',
            platform: platform
          }, window.location.origin);
        }

        // Close popup after delay
        setTimeout(() => {
          window.close();
        }, 2000);

      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Authentication failed');

        // Notify parent window of error
        if (window.opener) {
          window.opener.postMessage({
            type: 'oauth_error',
            platform: searchParams.get('platform') || 'unknown',
            error: error instanceof Error ? error.message : 'Authentication failed'
          }, window.location.origin);
        }

        // Close popup after delay
        setTimeout(() => {
          window.close();
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            {status === 'processing' && <Loader2 className="w-5 h-5 animate-spin" />}
            {status === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
            {status === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
            
            {status === 'processing' && 'Connecting Account...'}
            {status === 'success' && 'Connected Successfully!'}
            {status === 'error' && 'Connection Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            {message || 'Processing your authentication...'}
          </p>
          
          {status !== 'processing' && (
            <p className="text-center text-sm text-gray-500 mt-4">
              This window will close automatically.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
